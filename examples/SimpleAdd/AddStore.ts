import { value, task, delay } from "reuni-react";

export default class AddStore {
  @value cnt = 0;

  @task
  addOne() {
    this.cnt += 1;
  }

  @task.async
  async addOneAsync() {
    await delay(1000);
    this.cnt += 1;
  }
}
