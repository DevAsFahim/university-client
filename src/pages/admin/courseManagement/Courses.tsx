import { Button, Modal, Table, TableColumnsType } from "antd";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TCourse } from "../../../types";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";

export type TTableData = Pick<TCourse, "title" | "code">;

const Courses = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: courses,
    isLoading,
    isFetching,
  } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, code, prefix }) => ({
    key: _id,
    title,
    code: `${prefix} ${code}`,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Action",
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];

  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );
  //     filters.year?.forEach((item) =>
  //       queryParams.push({ name: "year", value: item })
  //     );
  //     setParams(queryParams);
  //   }
  // };

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <Table<TTableData>
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();

  const facultyOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };

    addFaculties(facultyData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultyOptions}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
