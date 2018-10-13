import React, { Component } from 'react';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FEED_QUERY } from './linkList'

const POST_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!){
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`

class CreateLink extends Component {
    state = {
        description: '',
        url: '',
    }

    render() {
        const { description, url } = this.state;
        return (
            <div>
                <div style={{textAlign:'center', padding:'2em'}}>
                    <input
                        value={description}
                        onChange={e => this.setState({ description: e.target.value })}
                        type="text"
                        placeholder="links description"
                    />
                    <input
                        value={url}
                        onChange={e => this.setState({ url: e.target.value })}
                        type="text"
                        placeholder="URL for link"
                    /><br/>
                    <Mutation 
                        mutation={POST_MUTATION} 
                        variables={{ description, url }}
                        onCompleted={() => this.props.history.push('/new')}
                        update={( store, { data: { post } }) => {
                            const data = store.readQuery({ query: FEED_QUERY })
                            data.feed.links.unshift(post)
                            store.writeQuery({
                                query: FEED_QUERY,
                                data
                              })
                            } 
                        }
                        >
                        {postMutation =>
                            <button onClick={postMutation}>Submit</button>
                        }
                    </Mutation>

                </div>
            </div>
        )
    }
}
export default CreateLink;