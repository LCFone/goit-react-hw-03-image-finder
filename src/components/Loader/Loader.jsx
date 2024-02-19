import { ColorRing } from 'react-loader-spinner';

export const Loader = ({ loading, error }) => {
  return (
    <>
      {loading ? (
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e1525b', '#f46c4a', '#f7a452', '#a5c360', '#6b9971']}
        />
      ) : null}
      {error ? <p className="error-txt">Error: {error}</p> : null}
    </>
  );
};
