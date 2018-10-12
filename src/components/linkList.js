import React, { Component } from 'react';
import Link from './links';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const FEED_QUERY = gql`
{
    feed{
        links{
            id
            createdAt
            url
            description
        }
    }
}
`
class LinkList extends Component {
    render() {
        return (
            <div style={{textAlign:'center'}}>
                <Query query={FEED_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <div>Loading...</div>
                        if (error) return <div>ERROR -> {error}</div>

                        const linksToRender = data.feed.links
                        return (
                            <div>
                                <ul>
                                {linksToRender.map(link => <li key={link.id+'Li'}><Link key={link.id} link={link} /></li>)}
                                </ul>
                            </div>
                        )
                    }}
                </Query>
            </div>
        )
    }
}
export default LinkList;