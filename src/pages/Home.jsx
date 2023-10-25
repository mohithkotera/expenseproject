import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { RiPencilFill, RiDeleteBin6Fill } from "react-icons/ri";
import Modal from "../components/Modal";
import { AiOutlinePlus } from "react-icons/ai";

const Home = () => {
  const navigation = useLocation();
  const usermail = navigation.state;
  const [arr, setArr] = useState(JSON.parse(localStorage.getItem("tabledata")));
  const [edit, setEdit] = useState([]);
  const [updateid, setUpdateid] = useState();
  const [filterDate, setFilterDate] = useState(null);
  const [byname, setByname] = useState();
  const [filterd, setFiltered] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    category: "",
    dateofExp: "",
    amount: "",
    updatedat: new Date(Date.now()).toDateString(),
    createdby: usermail,
    desp: "",
  });

  const create = async () => {
    if (
      !details.name ||
      !details.category ||
      !details.dateofExp ||
      !details.amount ||
      !details.desp
    ) {
      return alert("Please fill all fields");
    }
    await setArr((pre) => {
      return [...pre, details];
    });
    setCreateModal(false);
    setDetails({
      name: "",
      category: "",
      dateofExp: "",
      amount: "",
      updatedat: new Date(Date.now()).toDateString(),
      createdby: usermail,
      desp: "",
    });
  };

  const Delete = (id) => {
    setArr((pre) => {
      return pre.filter((e, i) => i !== id);
    });
    setDeleteModal(false);
  };

  const EditDetails = (id) => {
    setEditModal(true);
    setUpdateid(id);
    const EditArr = arr.filter((e, i) => i === id);
    console.log("EditArr", id);
    setEdit(EditArr);
  };

  const Update = async () => {
    const updatedData = [...arr];
    const objectToUpdate = await updatedData.find((ele, i) => i === updateid);
    console.log("objectToUpdate", objectToUpdate);
    if (
      !details.name ||
      !details.category ||
      !details.dateofExp ||
      !details.amount ||
      !details.desp
    ) {
      return alert("Please fill all fields");
    }
    if (objectToUpdate) {
      objectToUpdate.name = details.name;
      objectToUpdate.category = details.category;
      objectToUpdate.dateofExp = new Date(details.dateofExp);
      objectToUpdate.amount = details.amount;
      objectToUpdate.updatedat = details.updatedat;
      objectToUpdate.createdby = details.createdby;
      objectToUpdate.desp = details.desp;
    }
    setArr(updatedData);
    setEditModal(false);
  };

  useEffect(() => {
    const Storedatalocaly = async () => {
      await localStorage.setItem("tabledata", JSON.stringify(arr));
    };
    Storedatalocaly();
  }, [arr]);

  useEffect(() => {
    edit?.map((val, i) => {
      return setDetails({
        name: val.name,
        category: val.category,
        dateofExp: new Date(val.dateofExp),
        amount: val.amount,
        updatedat: val.updatedat,
        createdby: val.createdby,
        desp: val.desp,
      });
    });
  }, [edit]);

  useEffect(() => {
    const Filter = async () => {
      await setFiltered(arr);
      const filterData = await arr.filter(
        (e) =>
          new Date(e.dateofExp).toLocaleDateString() ===
            new Date(filterDate).toLocaleDateString() || e.name === byname
      );
      if (filterData.length >= 1) {
        await setFiltered(filterData);
      } else {
        await setFiltered(arr);
      }
    };
    Filter();
  }, [filterDate, byname, arr]);

  return (
    <div className="p-10">
      <div className="border-2 border-black py-8 px-5 rounded-xl">
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-xl font-bold text-black">MY EXPENSE MANAGER</h3>

          <div className="flex gap-x-3 items-center">
            <DatePicker
              selected={filterDate}
              onChange={(e) => setFilterDate(e)}
              placeholderText="Filter By Date Of Expense"
              className="bg-transparent border-2 border-black placeholder:text-black px-3"
            />
            <input
              placeholder="Search Expense by Name"
              className="bg-transparent border-2 border-black placeholder:text-black px-3"
              type="text"
              onChange={(e) => setByname(e.target.value)}
            />
            <button
              onClick={() => setCreateModal(true)}
              className="bg-[#23ce6b] text-white px-2  flex gap-x-2 items-center"
            >
              <AiOutlinePlus />
              New Expense
            </button>
          </div>
        </div>
        <div className="mt-4">
          <table className="w-full bg-white">
            <thead className="bg-[#adb5bd]">
              <tr className="">
                <th className="py-3 border border-grey first:rounded-tl-xl">
                  Name
                </th>
                <th className="py-3 border border-grey">Category</th>
                <th className="py-3 border border-grey">Date Of Expense</th>
                <th className="py-3 border border-grey">Amount</th>
                <th className="py-3 border border-grey">Updated At</th>
                <th className="py-3 border border-grey">Created By</th>
                <th className="py-3 border border-grey last:rounded-tr-xl"></th>
              </tr>
            </thead>

            <tbody>
              {filterd?.map((item, index) => (
                <tr key={index}>
                  <td className="border border-grey py-2 px-2 text-center">
                    {item.name}
                  </td>
                  <td className="border border-grey py-2 px-2 text-center">
                    {item.category}
                  </td>
                  <td className="border border-grey py-2 px-2 text-center">
                    {new Date(item.dateofExp).toLocaleDateString()}
                  </td>
                  <td className="border border-grey py-2 px-2 text-center">
                    INR&nbsp;{item.amount}
                  </td>
                  <td className="border border-grey py-2 px-2 text-center">
                    {item.updatedat}
                  </td>
                  <td className="border border-grey py-2 px-2 text-center">
                    {item.createdby === usermail ? "me" : item.createdby}
                  </td>
                  <td className="border border-grey py-2 px-2 text-center ">
                    <div className="flex gap-x-3 justify-center items-center">
                      <button onClick={() => EditDetails(index)}>
                        <RiPencilFill />
                      </button>
                      <button onClick={() => setDeleteModal(true)}>
                        <RiDeleteBin6Fill color="brown" />
                      </button>
                    </div>
                  </td>
                  <Modal
                    isOpen={deleteModal}
                    onClose={() => setDeleteModal(false)}
                  >
                    <div className=" grid  gap-y-4 px-3 py-4">
                      <p className="text-center">
                        Are you sure you want to delete this Expense?
                      </p>
                      <div className="flex gap-x-3 justify-center items-center">
                        <button
                          onClick={() => setDeleteModal(false)}
                          className="bg-[#6c757d] px-12 text-white py-1 rounded-lg"
                        >
                          No
                        </button>

                        <button
                          onClick={() => Delete(index)}
                          className="bg-[#23ce6b] text-white px-6 py-1 rounded-lg"
                        >
                          Yes,&nbsp;Delete
                        </button>
                      </div>
                    </div>
                  </Modal>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* ////////////////CREATE MODAL//////////////////// */}
      <Modal isOpen={createModal} onClose={() => setCreateModal(false)}>
        <div className=" grid  gap-y-4 px-3 py-4">
          <h3 className="text-black font-bold text-xl">Create New Expense</h3>
          <div className="flex flex-col space-y-1 ">
            <label className="text-base font-semibold">Name</label>
            <input
              type="text"
              className="bg-[#adb5bd60] placeholder:text-black p-2 outline-none border-none"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              placeholder="Name the Expense"
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-base font-semibold">Description</label>
            <input
              className="bg-[#adb5bd60] placeholder:text-black p-2 outline-none border-none"
              type="text"
              onChange={(e) => setDetails({ ...details, desp: e.target.value })}
              placeholder="Describe the Expense"
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-base font-semibold">Category</label>
            <select
              defaultValue={"DEFAULT"}
              onChange={(e) =>
                setDetails({ ...details, category: e.target.value })
              }
              className="bg-[#adb5bd60] placeholder:text-black p-2 outline-none border-none w-full"
            >
              <option value="DEFAULT">Select Category</option>
              <option>Books</option>
              <option>Health</option>
              <option>Electronics</option>
              <option>Travel</option>
              <option>Education</option>
              <option>Others</option>
            </select>
          </div>

          <div className="flex flex-col ">
            <label className="text-base font-semibold">Date Of Expense</label>
            <DatePicker
              selected={details.dateofExp}
              onChange={(e) => setDetails({ ...details, dateofExp: e })}
              placeholderText="Select Date"
              className="bg-[#adb5bd60] placeholder:text-black p-2 outline-none border-none w-full"
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-base font-semibold">Expense Amount</label>
            <input
              className="bg-[#adb5bd60] placeholder:text-black p-2 outline-none border-none"
              type="text"
              onChange={(e) =>
                setDetails({ ...details, amount: e.target.value })
              }
              placeholder="Expense Amount In INR"
            />
          </div>
          <div className="flex flex-row justify-between items-center py-5 ">
            <button
              onClick={() => setCreateModal(false)}
              className="bg-[#6c757d] px-12 text-white py-1 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={() => create()}
              className="bg-[#23ce6b] text-white px-6 py-1 rounded-lg"
            >
              Create Expense
            </button>
          </div>
        </div>
      </Modal>

      {/* ////////////////EDIT MODAL//////////////////// */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
        <div className=" grid gap-y-4 px-3 py-4">
          <h3 className="text-black font-semibold text-lg">Edit Expense</h3>

          <div className="flex flex-col ">
            <label className="text-base font-semibold">Name</label>
            <input
              className="bg-[#adb5bd60] placeholder:text-black p-2 outline-none border-none"
              type="text"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              placeholder="Name the Expense"
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-base font-semibold">Description</label>
            <input
              className="bg-[#adb5bd60] placeholder:text-black p-2 outline-none border-none"
              type="text"
              value={details.desp}
              onChange={(e) => setDetails({ ...details, desp: e.target.value })}
              placeholder="Describe the Expense"
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-base font-semibold">Category</label>
            <select
              className="bg-[#adb5bd60] placeholder:text-black p-2 outline-none border-none"
              defaultValue={details.category}
              onChange={(e) =>
                setDetails({ ...details, category: e.target.value })
              }
            >
              <option value={details.category}>{details.category}</option>
              <option>Books</option>
              <option>Health</option>
              <option>Electronics</option>
              <option>Travel</option>
              <option>Education</option>
              <option>Others</option>
            </select>
          </div>
          <div className="flex flex-col ">
            <label className="text-base font-semibold">Date Of Expense</label>
            <DatePicker
              selected={details.dateofExp}
              onChange={(e) => setDetails({ ...details, dateofExp: e })}
              placeholderText="Select Date"
              className="bg-[#adb5bd60] placeholder:text-black p-2 outline-none border-none w-full"
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-base font-semibold">Expense Amount</label>
            <input
              type="text"
              className="bg-[#adb5bd60] placeholder:text-black p-2 outline-none border-none"
              value={details.amount}
              onChange={(e) =>
                setDetails({ ...details, amount: e.target.value })
              }
              placeholder="Expense Amount In INR"
            />
          </div>
          <div className="flex flex-row justify-between items-center py-5 ">
            <button
              onClick={() => setEditModal(false)}
              className="bg-[#6c757d] px-12 text-white py-1 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={() => Update()}
              className="bg-[#23ce6b] text-white px-6 py-1 rounded-lg"
            >
              Update Expense
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
