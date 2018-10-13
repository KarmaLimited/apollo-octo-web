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
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <Query query={FEED_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <div><Spinner/></div>
                        if (error) return <div>ERROR -> {error}</div>

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