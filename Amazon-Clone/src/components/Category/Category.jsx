import CategoryList from './CategoryList';
import { CategoryData } from "./CategoryData.js";
import style from './Category.module.css'

function Category() {
  
  return (
    <div className={style.category__container}>
      {CategoryData?.map((dataList, index) => {
       return <CategoryList data={dataList} key={index} />;
      })}
    </div>
  );
}

export default Category