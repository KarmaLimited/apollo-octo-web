import React, { Component } from 'react';
import { AUTH_TOKEN } from './utils/constants'
import { timeDifferenceForDate } from './utils/utils'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { FaChevronUp } from 'react-icons/fa'

const VOTE_MUTATION = gql`
mutation VoteMutation($linkId: ID!){
    vote(linkId: $linkId){
        id
        link{
            votes {
                id
                user {
                    id
                }
            }
        }
        user{
            id
        }
    }
}
`;
class Link extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
            <div>
                {/* {this.props.link.description} ({this.props.link.url}) */}
                <div className="flex mt2 items-start">
                    <div className="flex items-center">
                        {/* <span className="gray">{this.props.index + 1}.</span> */}
                        {authToken && (
                            <Mutation 
                                mutation={VOTE_MUTATION} 
                                variables={{ linkId: this.props.link.id }}
                                update={(store, {data: { vote } }) => 
                                this.props.updateStoreAfterVote(store, vote, this.props.link.id )
                                }
                                >
                                {voteMutation => (
                                    <div className="ml1 f11 pointer" onClick={voteMutation}>
                                    <FaChevronUp className="voteChevron dark-green" />
                                    </div>
                                )}
                            </Mutation>

                        )}
                    </div>
                    <div className="ml1">
                        <div>
                        <a className="dark-green b" title={this.props.link.url} href={this.props.link.url}  rel="noopener noreferrer" target="_blank">{this.props.link.description}</a>
                        </div>
                        <div className="fl gray">
                            {this.props.link.votes.length} votes <span className="dark-green b">|</span> by{' '}
                            {this.props.link.postedBy
                                ? this.props.link.postedBy.name
                                : 'Unknown'}<span className="dark-green b"> | </span> 
                            {timeDifferenceForDate(this.props.link.createdAt)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Link;