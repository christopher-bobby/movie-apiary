const MainContainer = ({children} : {children: any}) => {
    return (
      <div className='main-page-container'>
          {children}
        <style jsx>{`
        .main-page-container {
          max-width: 1400px;
          min-height: 100vh;
          padding: 0px 15px;
          margin: auto;
          margin-top: 30px;
          min-height: 100vh;
        }

        @media (min-width: 768px) {
            .main-page-container {
                flex-direction: row;
                flex-wrap: wrap;
            }  
        }
      `}</style>
      </div>
    )
};
  
export default MainContainer;
  