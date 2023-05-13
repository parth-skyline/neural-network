import StudentsPicker from "../components/StudentsPicker";
import StudentsTable from "../components/StudentsTable";
import {
  fetchStudentData,
  fetchSchoolData,
  fetchLegalguardianData,
} from "../utils";
import { useState } from "react";

const studentsDataComponent = () => {
  const [data, setData] = useState({
    studentsData: [],
    schoolsData: [],
    legalguardiansData: [],
  });

  const onStudentsPick = async (studentIds) => {
    const tempStudentsData = [];
    const tempSchoolsData = [];
    const tempLegalguardiansData = [];

    for (const studentId of studentIds) {
      const studentData = await fetchStudentData(studentId);
      tempStudentsData.push(studentData);

      for (const student of studentData) {
        const { schoolId, legalguardianId } = student;

        const schoolData = await fetchSchoolData(schoolId);
        tempSchoolsData.push(schoolData);

        const legalguardianData = await fetchLegalguardianData(legalguardianId);
        tempLegalguardiansData.push(legalguardianData);
      }
    }

    setData((prevData) => {
      return {
        studentsData: [...prevData.studentsData, ...tempStudentsData],
        schoolsData: [...prevData.schoolsData, ...tempSchoolsData],
        legalguardiansData: [
          ...prevData.legalguardiansData,
          ...tempLegalguardiansData,
        ],
      };
    });
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={data.studentsData}
        schoolsData={data.schoolsData}
        LegalguardiansData={data.legalguardiansData}
      />
    </>
  );
};

export default studentsDataComponent;
