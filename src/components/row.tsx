const Row = ({children} : {children: React.ReactNode}) => {

    return (
      <div className='row' suppressHydrationWarning>
          {children}
          <style jsx>{`
              .row {
                  display: flex;
                  flex-direction: column;
                  margin-left: -15px;
                  margin-right: -15px;
              }
          
              @media (min-width: 768px) {
                  .row {
                    flex-direction: row;
                    flex-wrap: wrap;
                  }  
              }
          `}</style>
      </div>
    )
  };
  
  export default Row;
  