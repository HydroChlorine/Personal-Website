import { lazy, Suspense } from 'react'
const RelatedIdeasList = lazy(() => import('./RelatedIdeasList'))
export function RelatedIdeas({ id }: { id: string }) {
  return (
    <Suspense fallback={null}>
      <RelatedIdeasList id={id} />
    </Suspense>
  )
}
