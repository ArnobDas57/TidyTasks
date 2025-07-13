const page = ({ params }: { params: { taskId: string } }) => {
  return <div>task Id: {params.taskId}</div>;
};

export default page;
