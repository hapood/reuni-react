import { value, task, delay } from "reuni-react";

export default class AddStore {
  @value cnt = 0;

  @task
  add(num: number) {
    this.cnt += num;
  }
}
