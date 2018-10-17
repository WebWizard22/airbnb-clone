import * as React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import { Listing } from 'src/graphql.schema'

export const searchListingsQuery = gql`
    query SearchListings($address: [String]) {
        searchListings(input: { address: $address }) {
            id
            name
            category
            description
            price
            beds
            guests
            lat
            lng
            amenities
            address
            addresstags
        }
    }
`

interface WithListings {
    listings: Listing[]
    loading: boolean
}

interface Props {
    address: string[]
    children: (values: WithListings) => React.ReactNode
}

export class SearchListingsQuery extends React.PureComponent<Props> {
    public render() {
        const { address } = this.props

        return (
            <Query query={searchListingsQuery} variables={{ address }}>
                {({ data, loading }) => {
                    let listings: Listing[] = []

                    if (data && data.searchListings) {
                        listings = data.searchListings
                    }

                    return this.props.children({
                        listings,
                        loading
                    })
                }}
            </Query>
        )
    }
}
