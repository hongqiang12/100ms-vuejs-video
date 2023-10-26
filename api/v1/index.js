import request from "~/utils/request";

export function liveList(data) {
  return request({
    url: "/live-streams",
    method: "get",
    data,
  });
}
