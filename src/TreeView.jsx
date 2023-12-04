import { useState, useEffect } from "react";
import { CategotyTree } from "./components/CategotyTree";
import { MdAddToPhotos } from "react-icons/md";
import uuid4 from "uuid4";
import "./treeView.scss";

export const TreeView = () => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("catalog")) || []
  );
  const idNew = uuid4();

  useEffect(() => {
    localStorage.setItem("catalog", JSON.stringify(data));
  }, [data]);

  const deleteCategory = (e) => {
    const { id } = e.target;

    const filteredData = (data, id) => {
      return data.reduce((prev, curr) => {
        const children =
          curr?.children?.length > 0 ? filteredData(curr?.children, id) : [];
        return curr?.id !== id ? [...prev, { ...curr, children }] : prev;
      }, []);
    };
    setData(filteredData(data, id));
  };

  const addNewSubCategory = (e) => {
    const { id } = e.target;
    function findById(acc, el) {
      if (el?.id === id) return el;
      if (el?.children?.length > 0) return el.children.reduce(findById, acc);
      return acc;
    }

    let element = data?.reduce(findById, null);

    let newCategory = [
      {
        id: idNew,
        title: "Sub-category title",
        children: [],
      },
    ];

    const updatedData = (data, element) => {
      return data?.reduce((prev, curr) => {
        const children =
          curr?.children?.length > 0
            ? updatedData(curr?.children, element)
            : [];
        return curr?.id !== element?.id
          ? [...prev, { ...curr, children }]
          : [...prev, { ...curr, children: children.concat(newCategory) }];
      }, []);
    };

    setData(updatedData(data, element));
  };

  const addNewCategory = () => {
    let newCategory = [
      {
        id: idNew,
        title: "Category title",
        children: [],
      },
    ];
    const updatedData = data.concat(newCategory);
    setData(updatedData);
  };

  const inputHandle = (e) => {
    const { id, value } = e.target;

    function findById(acc, el) {
      if (el?.id === id) return el;
      if (el?.children?.length > 0) return el.children.reduce(findById, acc);
      return acc;
    }
    let element = data?.reduce(findById, null);

    const updatedData = (data, element) => {
      return data?.reduce((prev, curr) => {
        const children =
          curr?.children?.length > 0
            ? updatedData(curr?.children, element)
            : [];
        return curr?.id !== element?.id
          ? [...prev, { ...curr, children }]
          : [...prev, { ...curr, title: value }];
      }, []);
    };
    setData(updatedData(data, element));
  };

  return (
    <div className="tree-wrap">
      <div className="new-category-wrap" onClick={addNewCategory}>
        <MdAddToPhotos size={35} color="#8bc34a" />
        <p>Add New Category</p>
      </div>
      <CategotyTree
        data={data}
        inputHandle={inputHandle}
        deleteCategory={deleteCategory}
        addNewSubCategory={addNewSubCategory}
      />
    </div>
  );
};
