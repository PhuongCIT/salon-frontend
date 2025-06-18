import { useContext, useState } from "react";
import Modal from "../../../lib/modal";
// import shiftApi from "../../../services/shiftService";
import { AppContext } from "../../../context/AppContext";
import { toast } from "react-toastify";
import workShiftApi from "../../../services/workShiftService";

const CreateStaffShift = ({ isOpen, onClose, shiftId }) => {
  const { getAllShifts, staffs } = useContext(AppContext);
  const [staffId, setStaffId] = useState();

  //gọi api tạo ca làm
  const handleCreateShift = async () => {
    try {
      const data = { staffId, shiftId };
      console.log("data ", data);
      const response = await workShiftApi.adminCreate(data);
      console.log("resData ", response);
      //   const data = response.data;
      if (response.data.success) {
        toast.success("Đăng ký cho nhân viên thành công");
        //tạo ca làm thành công
        getAllShifts();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      //   onClose={onClose}
    >
      <h3 className="text-lg font-semibold mb-4">Tạo ca làm mới</h3>
      <div className="space-y-4">
        <select
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl  dark:text-white dark:bg-gray-600"
        >
          <option value="">Chọn nhân viên </option>
          {staffs?.map((staff) => (
            <option key={staff._id} value={staff._id}>
              {staff.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCreateShift}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Gán ca làm
        </button>
      </div>
    </Modal>
  );
};

export default CreateStaffShift;
