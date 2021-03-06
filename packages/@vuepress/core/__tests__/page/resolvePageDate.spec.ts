import { resolvePageDate } from '@vuepress/core'

const testCases: [
  Parameters<typeof resolvePageDate>,
  ReturnType<typeof resolvePageDate>
][] = [
  // `frontmatter.data` is an instance of `Date`
  [
    [
      {
        frontmatter: { date: new Date(Date.UTC(2020, 9, 4)) },
        filePathRelative: null,
      },
    ],
    '2020-10-04',
  ],
  // `frontmatter.data` is a valid date string
  [
    [
      {
        frontmatter: { date: '2020-10-04' },
        filePathRelative: null,
      },
    ],
    '2020-10-04',
  ],
  // `frontmatter.data` is a invalid date string
  [
    [
      {
        frontmatter: { date: 'foobar' },
        filePathRelative: null,
      },
    ],
    '1970-01-01',
  ],
  // `frontmatter.data` is `undefined`, and relative file path is `null`
  [
    [
      {
        frontmatter: {},
        filePathRelative: null,
      },
    ],
    '1970-01-01',
  ],
  // filename is empty
  [
    [
      {
        frontmatter: {},
        filePathRelative: '',
      },
    ],
    '1970-01-01',
  ],
  // filename without date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: 'foo.md',
      },
    ],
    '1970-01-01',
  ],
  // filename with date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-10-04-foo.md',
      },
    ],
    '2020-10-04',
  ],
  // filename without date prefix, dirname without date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: 'foo/bar.md',
      },
    ],
    '1970-01-01',
  ],
  // filename with date prefix, dirname without date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: 'foo/2020-10-04-bar.md',
      },
    ],
    '2020-10-04',
  ],
  // filename with date prefix, dirname with date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-10-04-foo/2020-10-04-bar.md',
      },
    ],
    '2020-10-04',
  ],
  // filename without date prefix, dirname with date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-10-04-foo/bar.md',
      },
    ],
    '2020-10-04',
  ],
  // for coverage purpose
  [
    [
      {
        frontmatter: {},
        filePathRelative: '/',
      },
    ],
    '1970-01-01',
  ],
]

describe('core > page > resolvePageDate', () => {
  describe('should resolve page date correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`raw: ${JSON.stringify(source)}`, () => {
        expect(resolvePageDate(...source)).toEqual(expected)
      })
    })
  })
})
