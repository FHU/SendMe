import { createFileRoute } from '@tanstack/react-router'
import Card from './-components/card'
import Card1 from './-components/card1'
import Card2 from './-components/card2'
import Background from './-components/background'

export const Route = createFileRoute('/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Background/>
  </div>
}
