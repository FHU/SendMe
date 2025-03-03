import { createFileRoute } from '@tanstack/react-router'
import Card from './-components/card'

export const Route = createFileRoute('/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Card/>
  </div>
}
