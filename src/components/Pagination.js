import styled from 'styled-components';
import { useData } from './providers';
import { useNavigate, useLocation } from 'react-router-dom';

export function Pagination() {
  const { activePage, setActivePage, pages } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  if (pages.length <= 1) return null;

  const pageClickHandler = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActivePage(pageNumber);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber);
    navigate({ search: searchParams.toString() });
  };

  return (
    <StyledPagination>
      {activePage > 2 && (
        <>
          <Page onClick={() => pageClickHandler(1)}>« First</Page>
          <Ellipsis>...</Ellipsis>
        </>
      )}

      {activePage > 1 && (
        <Page onClick={() => pageClickHandler(activePage - 1)}>
          {activePage - 1}
        </Page>
      )}

      <Page active>{activePage}</Page>

      {activePage < pages.length && (
        <Page onClick={() => pageClickHandler(activePage + 1)}>
          {activePage + 1}
        </Page>
      )}

      {activePage < pages.length - 1 && (
        <>
          <Ellipsis>...</Ellipsis>
          <Page onClick={() => pageClickHandler(pages.length)}>Last »</Page>
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
