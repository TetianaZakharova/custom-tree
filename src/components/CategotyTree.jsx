import { TreeNode } from "./TreeNode";

export const CategotyTree = ({ data, deleteCategory, addNewSubCategory, inputHandle }) => {
  return (
    <div>
      <ul className="tree-list">
        {data?.map((tree) => (
          <TreeNode
            data={data}
            node={tree}
            key={tree.id}
            deleteCategory={deleteCategory}
            addNewSubCategory={addNewSubCategory}   
            inputHandle={inputHandle}
          />
        ))}
      </ul>
    </div>
  );
};
