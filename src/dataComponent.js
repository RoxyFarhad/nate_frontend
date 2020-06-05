import React, {useState, useEffect} from 'react';

function renderTableData(data) {
    return data['data'].map((row, j) => {
        const {word, count } = row
        return (
            <tr key={word}> 
                <td>{word}</td>
                <td>{count}</td>
            </tr>
        )
    })
}

const DataComponent = ({dataObj}) => {

    const [visible, setVisible] = useState(false)
    const [data, setData] = useState(dataObj)

    return visible ? 
    (<div> 
        <button onClick={() => {setVisible(!visible)}}> {data['url']} </button> <span> SORT FUNCTION: {data['mode']} </span>
        <div> 
            <br />
            <table className='word-count'> 
                <tbody> 
                <tr>
                    <th key={'Word-header'}>WORD</th>
                    <th key={'Count-header'}>COUNT</th>
                </tr>
                    {renderTableData(data)}
                </tbody>
            </table>
        </div>  
    </div>) : (<div>
                <button onClick={() => {setVisible(!visible)}}> {data['url']} </button> <span> SORT FUNCTION: {data['mode']} </span>
            </div>) 
}

export default DataComponent; 