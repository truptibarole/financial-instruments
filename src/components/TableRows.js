const TableRows = ({ financialInstruments }) => {
    return (
        financialInstruments.map((details, index) => {
            const priceClass = details.price > 0 ? 'positive_price' : 'negative_price';
            return (
                <tr key={index} className={details.assetClass.toLowerCase()}>
                    <td>{details.assetClass}</td>
                    <td className={priceClass}>{details.price}</td>
                    <td>{details.ticker}</td>
                </tr>
            );
        })
    )
};

export default TableRows;