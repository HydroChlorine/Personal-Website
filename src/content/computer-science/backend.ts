import type { ProjectArticle } from '../types'
import { csFigure as fig } from './figures.ts'

export const backendArticle: ProjectArticle = {
  subject: 'computer-science',
  kicker: 'Making the next click possible',
  reviewed: '2026-11-09',
  introduction: [
    'On a staff portal, someone opens a list, adds a record, changes a field, or searches for just the entries they need. Each action is small. Making those actions work together was the everyday work behind my Summer 2025 software engineering internship at Global InfoTech.',
    'I worked on Java and Spring Boot backend features: defining DTOs, connecting application logic to MySQL, writing queries, and preparing REST APIs for the frontend team. Maven and Swagger were part of that workflow. The illustrations below describe the general ideas using abstract shapes.',
  ],
  sections: [
    {
      id: 'request',
      title: '01 / The screen asks; the backend makes it happen',
      paragraphs: [
        'Imagine someone pressing Save. The interface knows what they entered, but that information still needs a useful shape, a set of checks, and somewhere to go. A backend turns that intention into a change the application can keep.',
        'This is the familiar create, read, update, delete cycle—CRUD. I extended an existing system with new objects and transfer logic, so that a frontend action could travel through the application and come back with an answer the interface could use.',
      ],
      figure: fig(
        'request-flow',
        'A screen sends an intention to an application, which reads or changes stored records and returns a shaped response. Four symbols represent create, read, update and delete.',
        'A click on the screen becomes work behind it. An abstract illustration of a typical CRUD exchange.',
        1300,
      ),
    },
    {
      id: 'data',
      title: '02 / Bring the right pieces together',
      paragraphs: [
        'The answer on a screen rarely looks exactly like a row in a database. Useful details may live in different tables, connected by relationships. A filter narrows the selection; a join brings related pieces together.',
        'Part of my work was writing that SQL and building DTOs to carry the result. The goal was a response that suited the frontend: enough context to build the component, in a predictable shape, without asking the interface to reconstruct the database.',
      ],
      figure: fig(
        'relational-filter',
        'Related abstract records flow from two collections, connect through matching symbols, pass a selection gate, and arrive as a small frontend-ready card.',
        'Connected information, a purposeful selection, and a result ready for the screen. No company records are depicted.',
        1300,
      ),
    },
    {
      id: 'team',
      title: '03 / Ready for someone else to build on',
      paragraphs: [
        'An endpoint was also a handoff to a teammate. Clear fields, documented requests and responses, and consistent behavior meant frontend colleagues could turn the backend feature into something people could actually use.',
        'I enjoyed that connection: a query and a few Java objects eventually becoming a working part of another person’s screen. My contribution was one part of a larger application and a team’s ongoing work.',
      ],
    },
  ],
}
