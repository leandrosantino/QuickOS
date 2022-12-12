import { ScrollContainer } from "../../components/containers/ScrollContainer";
import { FilterFrame } from "../../components/dashboard/FilterFrame";
import { PageHeader } from "../../components/PageHeader";


export function Opened() {

  return (
    <div
      className="
        w-full h-[100%]
        px-5
      "
    >

      <PageHeader title='Preventivas Em Aberto' >
        <FilterFrame width={70} />
      </PageHeader>
      <div className="w-full h-[700px]">
        <ScrollContainer className="mt-5 h-full bg-gray-400" >
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
          <div>teste</div>
        </ScrollContainer>
      </div>

    </div>
  )
}
