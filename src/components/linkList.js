import React, { Component, Fragment } from 'react';
import Link from './links';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import Spinner from './loadingspinner';
import { LINKS_PER_PAGE } from './utils/constants';

export const FEED_QUERY = gql`
query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
    feed(first: $first, skip: $skip, orderBy: $orderBy){
        links {
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
                user {
                    id
                }
            }
        }
        count
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
        const isNewPage = this.props.location.pathname.includes('new')
        const page = parseInt(this.props.match.params.page, 10)

        const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
        const first = isNewPage ? LINKS_PER_PAGE : 100
        const orderBy = isNewPage ? 'createdAt_DESC' : null
        // Read the current state of the cached data for the FEED_QUERY from the store.
        const data = store.readQuery({
            query: FEED_QUERY,
            variables: { first, skip, orderBy }
        })
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
            purpose of this function is to update the votes in realtime with subscriptions
            but currently not working properly...
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
    _getQueryVariables = () => {
        const isNewPage = this.props.location.pathname.includes('new')
        const page = parseInt(this.props.match.params.page, 10)

        const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0
        const first = isNewPage ? LINKS_PER_PAGE : 100
        const orderBy = isNewPage ? 'createdAt_DESC' : null
        return { first, skip, orderBy }
    }

    _getLinksToRender = data => {
        const isNewPage = this.props.location.pathname.includes('new')
        if(isNewPage) { 
            return data.feed.links
        }
        const rankedLinks = data.feed.links.slice()
        rankedLinks.sort((l1, l2) => l2.votes.length - l1.votes.length)
        return rankedLinks
    }
    // Retrie the current page from the url and do a sanity check. 
    // Then you calc the next page and tell the router where to navigate next. 
    // The router will then reload the component with a new page in the url that 
    // will be used to calculate the right chunk of links to load. 
    _nextPage = data => {
        const page = parseInt(this.props.match.params.page, 10)
        if(page <= data.feed.count / LINKS_PER_PAGE) {
            const nextPage = page + 1
            this.props.history.push(`/new/${nextPage}`)
        } 
    }

    _previousPage = () => {
        const page = parseInt(this.props.match.params.page, 10)
        if(page > 1){
            const previousPage = page - 1
            this.props.history.push(`/new/${previousPage}`)
        }
    }


    render() {
        const currentPage = parseInt(this.props.match.params.page);
        // const lastpage = get the lastpage from the index and then remove the next button;
        return (
            <div style={{ textAlign: 'center' }}>
                <Query query={FEED_QUERY} variables={this._getQueryVariables()}>
                    {({ loading, error, data, subscribeToMore }) => {
                        if (loading) return <div><Spinner /></div>
                        if (error) return <div>ERROR:<br />message: {error}</div>
                        // # subscribe to new links (real-time)
                        this._subscribeToNewLinks(subscribeToMore)
                        // # subscribe to new votes in real-time
                        this._subscribeToNewVotes(subscribeToMore)

                        // const linksToRender = data.feed.links
                        const linksToRender = this._getLinksToRender(data)
                        const isNewPage = this.props.location.pathname.includes('new')
                        const pageIndex = this.props.match.params.page 
                                        ? (this.props.match.params.page - 1) * LINKS_PER_PAGE 
                                        : 0
                        
                        return (
                            <div>
                                <ol>
                                <Fragment>
                                    {linksToRender.map((link, index) => (

                                        <li key={link.id + 'LISTITEM'}>
                                            <Link
                                                key={link.id}
                                                link={link}
                                                index={index + pageIndex}
                                                updateStoreAfterVote={this._updateCacheAfterVote}
                                            />
                                        </li>
                                    ))}
                                    {isNewPage && (
                                        <div className="flex ml4 mv3 gray">
                                            <div className="pointer mr2" style={ currentPage === 1 ? { display:"none" } : { display:"inline" }} onClick={this._previousPage}>
                                                Previous
                                            </div>
                                            <div className="pointer" onClick={() => this._nextPage(data)}>
                                                Next
                                            </div>
                                        </div>
                                    )}
                                    </Fragment>
                                </ol>
                            </div>
                        )
                    }}
                </Query>
            </div>
        )
    }
}
export default withRouter(LinkList);

/*
# old feed query, without pagination
const FEED_QUERY = gql`
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
`;

*/