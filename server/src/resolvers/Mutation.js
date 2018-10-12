const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

function post(parent, {url, description }, ctx, info) {
    const userId = getUserId(ctx)
    return ctx.db.mutation.createLink(
        { 
            data: { 
                url, 
                description, 
                postedBy: { 
                    connect: 
                        { id: userId } 
                } 
            } 
        },
        info,
      )
}

async function signup(parent, args, context, info) {
    // In the signup mutation, encrypt user password with bcryptjs
    const password = await bcrypt.hash(args.password, 10)
    // use the Prisma binding instance to store thenew User in the database
    // with hardcoded id's
    const user = await context.db.mutation.createUser({
        data: { ...args, password },
    }, `{ id }`)

    // JWT sign with an APP_SECRET. (APP_SECRET needs to be created)
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

async function login(parent, args, context, info) {
    /*
    Instead of creating a new User object, 
    you’re now using the Prisma binding instance to
     retrieve the existing User record by the email 
     address that was sent along in the login mutation. 
     If no User with that email address was found, 
     you’re returning a corresponding error. 
     Notice that this time you’re asking for the id 
     and the password in the selection set. 
     The password is needed because it needs to be compared 
     with the one provided in the login mutation.*/
    const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `)
    if (!user) {
        throw new Error('No such user found')
    }

    // compare the provided password with the one that is stored in the database.
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}
async function vote(parent, args, context, info) {
    //  validate the incoming JWT with the getUserId helper function.
    const userId = getUserId(context)
  
    //  verify that the requesting User has not yet voted for the Link in args.linkId.
    const linkExists = await context.db.exists.Vote({
      user: { id: userId },
      link: { id: args.linkId },
    })
    // if link-vote exists
    if (linkExists) {
      throw new Error(`Already voted for link: ${args.linkId}`)
    }
  
    // else create vote
    return context.db.mutation.createVote(
      {
        data: {
          user: { connect: { id: userId } },
          link: { connect: { id: args.linkId } },
        },
      },
      info,
    )
  }

module.exports = {
    signup,
    login,
    post,
    vote
}