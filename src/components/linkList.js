import React, { Component } from 'react';
import Link from './links';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Spinner from './loadingspinner';


export const FEED_QUERY = gql`
{
    feed{
        links{
            id
            createdAt
            url
            description
            postedBy {
                id
                name
            }
            votes {
                id
                user{
                    id
                }
            }
        }
    }
}
`

const NEW_LINKS_SUBSCRIPTION = gql`
subscription {
    newLink{
        node{
            id
            url
            description
            createdAt
            postedBy{
                id
                name
            }
            votes {
                id
                user{
                    id
                }
            }
        }
    }
}
`;

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      node {
        id
        link {
          id
          url
          description
          createdAt
          postedBy {
            id
            name
          }
          votes {
            id
            user {
              id
            }
          }
        }
        user {
          id
        }
      }
    }
  }
`

class LinkList extends Component {

    _updateCacheAfterVote = (store, createVote, linkId) => {
        // Read the current state of the cached data for the FEED_QUERY from the store.
        const data = store.readQuery({ query: FEED_QUERY });

        // Find the link that the user just voted for from that list. 
        const votedLink = data.feed.links.find(link => link.id === linkId)
        // Manipulate that link by resetting its votes to the votes that were requested from server.
        votedLink.votes = createVote.link.votes;

        // Modify data and write it back into the store.
        store.writeQuery({ query: FEED_QUERY, data })
    }

    _subscribeToNewLinks = subscribeToMore => {
        subscribeToMore({
            //document represents the subscription query. The subscription will fire every time a new link is created.
            document: NEW_LINKS_SUBSCRIPTION,
    
            // updateQuery: Similar to cache update prop, this function is used to determine how 
            //the store should be updated with the data that was sent by the server  after the event occurred. 

            // updateQuery retrieves the new link from the received subscriptionData, 
            // and merges it into the existing list of links and return the results
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const newLink = subscriptionData.data.newLink.node

                return Object.assign({}, prev, {
                    feed: {
                        links: [newLink, ...prev.feed.links],
                        count: prev.feed.links.length + 1,
                        __typename: prev.feed.__typename
                    }
                })
            }
        })
    }

    _subscribeToNewVotes = subscribeToMore => {
        subscribeToMore({
            document: NEW_VOTES_SUBSCRIPTION,
            /*
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev
                const newVote = subscriptionData.data.newVote.node

                return Object.assign({}, prev, {
                    feed: {
                        votes: [newVote, ...prev.feed.links.votes],
                        __typename: prev.feed.links.__typename
                    }
                })
            } */
        })
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <Query query={FEED_QUERY}>
                    {({ loading, error, data, subscribeToMore }) => {
                        if (loading) return <div><Spinner /></div>
                        if (error) return <div>ERROR:<br />message: {error}</div>
                        //subscribe to new links (real-time)
                        this._subscribeToNewLinks(subscribeToMore)
                        //subscribe to new votes in real-time
                        this._subscribeToNewVotes(subscribeToMore)
                        const linksToRender = data.feed.links
                        return (
                            <div>
                                <ol>
                                    {linksToRender.map((link, index) => (

                                        <li key={link.id + 'LISTITEM'} index={index}>
                                            <Link
                                                key={link.id}
                                                link={link}
                                                updateStoreAfterVote={this._updateCacheAfterVote}
                                            />
                                        </li>

                                    ))}
                                </ol>
                            </div>
                        )
                    }}
                </Query>
            </div>
        )
    }
}
export default LinkList;