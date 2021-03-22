import ProductDescription from "components/ProductDescription";
import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";
import { injectReducer, injectSaga } from "redux-injectors";
import { getAllInfo, updateInfo } from "./action";
import reducer from "./reducer";
import saga from "./saga";
import useSWR from "swr";
import request from "utils/request";

const Product = (props) => {
  const { getAllInfo } = props;
  // const { data, error } = useSWR(
  //   `https://api-test.innoloft.com/product/6781/`,
  //   request
  // );
  // let picture = data && data.picture;
  // let tabInfo = data && [
  //   { name: "Description", description: data.description },
  //   {
  //     name: "Attributes",
  //     categories: data.categories,
  //     businessModels: data.businessModels,
  //   },
  // ];
  // let productMainInfo = { title: data.name, type: data.type };
  // console.log(data, "data from api");

  // useEffect(() => {
  //   getAllInfo();
  // });
  return <> {getAllInfo ? <ProductDescription {...props} /> : ""}</>;
};

function mapStateToProps(state) {
  // all the props from redux
  return {
    user: state.app.user,
    picture: state.app.picture,
    tabInfo: state.app.tabInfo,
    productMainInfo: state.app.productMainInfo,
    company: state.app.company,
  };
}

function mapDispatchToProps(dispatch) {
  // connect all the function for disipacting action
  return {
    getAllInfo: (payload) => dispatch(getAllInfo(payload)),
    updateInfo: (payload) => dispatch(updateInfo(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectReducer({ key: "app", reducer }),
  injectSaga({ key: "app", saga }),
  withConnect,
  withRouter
)(Product);
