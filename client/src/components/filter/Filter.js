import "./filter.sass";

const Filter = () => {
  const arr = ["all", "Sale", "noSale"];
  return (
    <ul class="products-filter">

        {arr.map(i => {
                return <li class="products-filter_item">{i}</li>
        })}
    </ul>
  );
};
export default Filter;
