import type { ProjectArticle } from '../types'
import { csFigure as fig } from './figures.ts'

export const backendArticle: ProjectArticle = {
  subject: 'computer-science',
  detailsLabel: 'Under the hood / explanatory notes',
  kicker: 'A backend feature is a conversation with the frontend',
  reviewed: '2026-11-09',
  introduction: [
    'A search box can look simple from the outside. Behind it, someone has to decide which inputs are meaningful, how records connect, and what shape of response the interface needs.',
    'During Summer 2025, I worked as a Software Engineering Intern at Global InfoTech. I developed backend features for internal staff portals with Java, Spring Boot, Maven, REST/Swagger APIs, and MySQL. My work included DTOs, data-transfer logic, and queries for finding and filtering client data.',
    'The diagrams use invented work items, names, and records. They explain a representative flow without reproducing employer code, architecture, endpoints, or data.',
  ],
  sections: [
    {
      id: 'request',
      title: '01 / Translate a frontend question into a contract',
      paragraphs: [
        'A frontend needs more than access to a database. It needs an understandable request and a predictable response. A DTO gives that exchange a defined shape: the fields the caller supplies, or the fields the caller receives.',
        'I added objects and transfer logic to support new features and the interactions between components. The interesting part is making the boundary useful: a filtering request should express the intended question, and the response should carry what the frontend needs to display the result.',
      ],
      figure: fig(
        'request-flow',
        'A fictional filtered request passes through validation, a query/join step, and a response DTO containing selected records.',
        'A representative teaching flow. It is not a diagram of the company’s internal system.',
        1300,
      ),
    },
    {
      id: 'data',
      title: '02 / The requested answer may live across several tables',
      paragraphs: [
        'Some questions require relationships rather than a single-table lookup. My SQL work included multi-table joins and database relationships for the new client-data functionality.',
        'In the invented example below, work items refer to owners by ID. Filtering for open items in one team and joining the owner table produces a small response with the requested information. The real work had its own data and requirements; this example keeps the structure of the reasoning visible.',
      ],
      figure: fig(
        'relational-filter',
        'Four fictional work items are filtered by team and status and joined to an owner table, yielding items 1 and 4 with Ari and Bo.',
        'Every entity and value is invented. The output is calculated from the displayed records.',
        1300,
      ),
    },
    {
      id: 'team',
      title: '03 / An endpoint is part of someone else’s workflow',
      paragraphs: [
        'The result of this work was an API that frontend colleagues could use to build their components. Documenting the interface and working within the team’s review and testing process mattered alongside the query itself.',
        'It was also a different setting from a class project: I was extending an existing application with existing conventions and other people depending on its behavior. My backend changes contributed to a larger product and a team’s ongoing work.',
      ],
      aside: {
        title: 'A representative example, not a company disclosure',
        text: 'The narrative describes my role and tools at a public-professional level. The diagrams and records were created for this explanation; no proprietary implementation is included.',
      },
    },
  ],
}
