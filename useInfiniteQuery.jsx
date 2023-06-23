import { useInfiniteQuery } from 'react-query';

const fetchUsers = async (page) => {
  const response = await fetch(`/api/users?page=${page}`);
  const data = await response.json();
  return data;
};

const UserList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery('users', ({ pageParam }) => fetchUsers(pageParam), {
    getNextPageParam: (lastPage, allPages) => {
      // Determine the next page number or return null if no more pages
      return lastPage.nextPage;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <div>
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.users.map((user) => (
            <div key={user.id}>{user.name}</div>
          ))}
        </React.Fragment>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
};
