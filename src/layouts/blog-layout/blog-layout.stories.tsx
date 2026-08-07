import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import {
  BlogLayout,
} from './blog-layout';

import './blog-layout.stories.scss';

function ExampleHeader() {
  return (
    <div className="blog-story-header">
      <strong className="blog-story-header__brand">
        KZ-Rush
      </strong>

      <nav
        aria-label="Site navigation"
        className="blog-story-header__navigation"
      >
        <a href="#news">
          News
        </a>

        <a href="#records">
          Records
        </a>

        <a href="#maps">
          Maps
        </a>
      </nav>
    </div>
  );
}

function ExampleFooter() {
  return (
    <div className="blog-story-footer">
      © 2026 KZ-Rush
    </div>
  );
}

function ExampleNavigation() {
  return (
    <nav className="blog-story-navigation">
      <h2>
        Categories
      </h2>

      <ul>
        <li>
          <a href="#community">
            Community
          </a>
        </li>

        <li>
          <a href="#records">
            World records
          </a>
        </li>

        <li>
          <a href="#maps">
            Maps
          </a>
        </li>

        <li>
          <a href="#guides">
            Guides
          </a>
        </li>
      </ul>
    </nav>
  );
}

function ExampleAside() {
  return (
    <nav className="blog-story-contents">
      <h2>
        On this page
      </h2>

      <ul>
        <li>
          <a href="#introduction">
            Introduction
          </a>
        </li>

        <li>
          <a href="#records">
            Records
          </a>
        </li>

        <li>
          <a href="#conclusion">
            Conclusion
          </a>
        </li>
      </ul>
    </nav>
  );
}

function ExampleArticle() {
  return (
    <article className="blog-story-article">
      <h1 id="introduction">
        KZ-Rush community update
      </h1>

      <p>
        This layout is designed for news, articles,
        documentation, and other long-form content.
      </p>

      <p>
        The central column remains readable while optional
        navigation and supporting content occupy the side
        columns.
      </p>

      <h2 id="records">
        Recent records
      </h2>

      <p>
        Several players submitted new records during the
        latest release. Approved demos are now available
        from the records section.
      </p>

      <ul>
        <li>
          New PRO records
        </li>

        <li>
          Updated map rankings
        </li>

        <li>
          Improved demo validation
        </li>
      </ul>

      <h2 id="conclusion">
        What comes next
      </h2>

      <p>
        Future improvements may include article metadata,
        breadcrumbs, pagination, and a dedicated prose
        component.
      </p>
    </article>
  );
}

const meta = {
  title: 'Layouts/BlogLayout',
  component: BlogLayout,

  tags: [
    '!autodocs',
  ],

  parameters: {
    layout: 'fullscreen',
  },

  args: {
    header: <ExampleHeader />,
    footer: <ExampleFooter />,
    navigation: <ExampleNavigation />,
    aside: <ExampleAside />,
    children: <ExampleArticle />,
    contentWidth: 'md',
    stickySideColumns: true,
  },

  argTypes: {
    header: {
      control: false,
    },

    footer: {
      control: false,
    },

    navigation: {
      control: false,
    },

    aside: {
      control: false,
    },

    children: {
      control: false,
    },

    contentWidth: {
      control: 'select',

      options: [
        'sm',
        'md',
        'lg',
        'full',
      ],
    },

    stickySideColumns: {
      control: 'boolean',
    },

    navigationLabel: {
      control: 'text',
    },

    asideLabel: {
      control: 'text',
    },
  },
} satisfies Meta<typeof BlogLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ArticleOnly: Story = {
  args: {
    navigation: undefined,
    aside: undefined,
  },
};

export const WithNavigation: Story = {
  args: {
    aside: undefined,
  },
};

export const WithTableOfContents: Story = {
  args: {
    navigation: undefined,
  },
};

export const WideContent: Story = {
  args: {
    contentWidth: 'lg',
  },
};

export const FullWidthContent: Story = {
  args: {
    contentWidth: 'full',
  },
};

export const NonStickySideColumns: Story = {
  args: {
    stickySideColumns: false,
  },
};

export const WithoutHeaderAndFooter: Story = {
  args: {
    header: undefined,
    footer: undefined,
  },
};

export const LongArticle: Story = {
  args: {
    children: (
      <article className="blog-story-article">
        <h1>
          Long KZ-Rush article
        </h1>

        {Array.from(
          {
            length: 25,
          },
          (_, index) => (
            <section key={index}>
              <h2>
                Section {index + 1}
              </h2>

              <p>
                This is an example paragraph used to
                demonstrate normal document scrolling and
                sticky side columns.
              </p>
            </section>
          ),
        )}
      </article>
    ),
  },
};