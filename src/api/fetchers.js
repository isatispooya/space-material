// eslint-disable-next-line import/no-extraneous-dependencies


export const fetcher = (...args) => fetch(...args).then(res => res.json())

