import { useGetUsers } from "@shared/api";
import { ICreateUser } from "@shared/model";
import { INFINITE_LOAD_MARGIN } from "@shared/model/const";
import { columns } from "@widgets/table/model/columns";
import { DataTable } from "@widgets/table/Table";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { ThreeDots } from "react-loader-spinner";

export default function App() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetUsers();

  const { ref, inView } = useInView({
    rootMargin: INFINITE_LOAD_MARGIN,
  });

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) fetchNextPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, fetchNextPage]);

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page) ?? [],
    [data]
  );

  if (isLoading) {
    return (
      <div className=" h-screen flex justify-center items-center  py-10">
        <ThreeDots color="#0A0A0A" width={60} height={30} />
      </div>
    );
  }
  if (isError || !data) {
    return <div className="container mx-auto py-10">Error loading data</div>;
  }

  return (
    <div className="container mx-auto flex flex-col gap-4 py-10">
      <h1 className="text-2xl font-bold">Сотрудники</h1>
      <DataTable<ICreateUser, unknown> columns={columns} data={flatData} />
      <div ref={ref} onClick={() => fetchNextPage()} />
      {isFetchingNextPage && hasNextPage && (
        <div className="flex justify-center items-center my-8">
          <ThreeDots color="#0A0A0A" width={60} height={30} />
        </div>
      )}
    </div>
  );
}
