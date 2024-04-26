const Row = ({children} : {children: any}) => {

  return (
    <div className='row'>
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
