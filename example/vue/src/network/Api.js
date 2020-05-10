import { Network, controller, get, successNotice, getIn } from "network";
@controller("/music")
class Api extends Network {
  isSuccess(response) {
    const code = getIn(response, ["data", "code"]);
    return code === 0 || code === "0";
  }
  transformRes(response) {
    return getIn(response, ["data", "data"]);
  }
  interceptorRequest(config) {
    return config;
  }
  interceptorResponse(response) {
    return response;
  }
  handleNotice(handler,{options}) {
    const successMassage = getIn(options,['successMassage'],'操作成功');
    handler({
      title: '恭喜你！',
      desc: successMassage
    })
  }
  requestError() {}
  responseError() {}

  @get("/getDiscList")
  @successNotice('这一一条成功消息')
  getDiscList(options) {
    return this.common(options);
  }
}

export default new Api();
export { Api };
