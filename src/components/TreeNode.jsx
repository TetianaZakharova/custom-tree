import { useState } from "react";
import { CategotyTree } from "./CategotyTree";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export const TreeNode = ({
  node,
  deleteCategory,
  addNewSubCategory,
  inputHandle,
}) => {
  const [childrenVisible, setChildrenVisible] = useState(false);

  const hasChildren = node?.children?.length > 0 ? true : false;

  const childVisibilityHandle = () => {
    setChildrenVisible((prevState) => !prevState);
  };

  return (
    <div>
      <li key={node.id} id={node.id}>
        <div>
          <div className="tree-list tree-list__item">
            {hasChildren && (
              <div
                key={node.id}
                className={`tree-node ${childrenVisible ? "active" : ""}`}
                onClick={childVisibilityHandle}
              >
                {childrenVisible ? (
                  <FaMinusCircle size={25} color="#08909f" />
                ) : (
                  <FaPlusCircle size={25} color="#08909f" />
                )}
              </div>
            )}
            <input
              id={node.id}
              className="category-input"
              type="text"
              name="title"
              value={node.title}
              onChange={(e) => inputHandle(e)}
            />

            <div
              className="control-btn"
              onClick={(e) => deleteCategory(e)}
              id={node.id}
            >
              DELETE
            </div>

            <div
              className="control-btn add"
              id={node.id}
              onClick={(e) => addNewSubCategory(e)}
            >
              ADD
            </div>
          </div>

          {hasChildren && childrenVisible && (
            <div>
              <ul>
                <CategotyTree
                  data={node.children}
                  deleteCategory={deleteCategory}
                  addNewSubCategory={addNewSubCategory}
                  inputHandle={inputHandle}
                />
              </ul>
            </div>
          )}
        </div>
      </li>
    </div>
  );
};
