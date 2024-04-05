import PollItem from "../poll-item/PollItem";
import PageContent from "../../common/PageContent";
import Chart from "../chart/Chart";

function Poll({ data }) {
  return (
    <>
      {data?.errors && (
        <PageContent
          title={data.errors[0].field ?? data.errors[0].message}
          timeout={3000}
        />
      )}
      <PollItem data={data}/>
      <Chart data={data}/>
    </>
  );
}

export default Poll;
