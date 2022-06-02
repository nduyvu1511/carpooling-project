// import ReactDOM from "react-dom"
// import React, { useState } from "react"
// import * as Yup from "yup"
// import Select from "react-select"
// import { Field, Form, Formik } from "formik"

// function App() {
//   const [selectedYear, setSelectedYear] = useState("")

//   const testSchema = Yup.object().shape({
//     name: Yup.string().required("Enter Name"),
//     year: Yup.string().required("Select Year"),
//   })

//   const initialValues = {
//     name: "",
//     year: "",
//   }

//   // const handleYearChange = (selectedYear, values) => {
//   //   values.year = selectedYear.value;
//   //   console.log(selectedYear);
//   //   setSelectedYear(selectedYear);
//   // };

//   const handleYearChange = (selectedYear: any) => {
//     console.log(selectedYear)
//     setSelectedYear(selectedYear)
//   }

//   const yearOptions = [
//     { value: "1960", label: "1960" },
//     { value: "1961", label: "1961" },
//     { value: "1962", label: "1962" },
//     { value: "1963", label: "1963" },
//     { value: "1964", label: "1964" },
//     { value: "1965", label: "1965" },
//   ]

//   return (
//     <Formik validationSchema={testSchema} initialValues={initialValues}>
//       {({
//         handleChange,
//         handleBlur,
//         values,
//         errors,
//         touched,
//         handleSubmit,
//         setFieldTouched,
//       }) => {
//         return (
//           <>
//             <div>
//               <Select
//                 placeholder="Year"
//                 value={selectedYear}
//                 onChange={(selectedOption) => {
//                   handleYearChange(selectedOption)
//                   // handleYearChange(selectedOption, values);
//                   // values.year = selectedOption.value;
//                   console.log("values", values.year)
//                   handleChange("year")
//                 }}
//                 isSearchable={true}
//                 options={yearOptions}
//                 name="year"
//                 isLoading={false}
//                 loadingMessage={() => "Fetching year"}
//                 noOptionsMessage={() => "Year appears here"}
//               />
//               {errors.year}
//             </div>
//             <div style={{ marginTop: "24px", marginBottom: "10px" }}>
//               <button type="submit" onClick={handleSubmit}>
//                 Save
//               </button>
//             </div>
//           </>
//         )
//       }}
//     </Formik>
//   )
// }

// const rootElement = document.getElementById("root")
// ReactDOM.render(<App />, rootElement)
