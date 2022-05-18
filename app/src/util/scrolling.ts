import { Dispatch } from '@reduxjs/toolkit'
import axios from 'axios'

import { insert } from '../store/codes'

export default async ({
    apiHost,
    apiToken,
    pages,
    dispatch,
}: {
    pages: number
    apiHost: string
    apiToken: string
    dispatch: Dispatch<any>
}) => {
    let currentPage = 0
    let loading = false

    const lastOne = document.querySelector(
        '#codes > div:last-child',
    ) as HTMLDivElement

    const observer = new IntersectionObserver(async entries => {
        const entry = entries[0]

        if (
            entry.intersectionRatio > 0 &&
            loading == false &&
            currentPage < pages
        ) {
            loading = true
            currentPage = currentPage + 1

            const { data } = await axios({
                method: 'GET',
                url: `${apiHost}/api/codes?page=${currentPage}`,
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
            })

            if (data.codes.length != 0) {
                dispatch(insert(data.codes))

                const newLastOne = document.querySelector(
                    '#codes > div:last-child',
                ) as HTMLDivElement

                observer.observe(newLastOne)
            }

            observer.unobserve(lastOne)
            loading = false
        }
    })

    observer.observe(lastOne)
}
