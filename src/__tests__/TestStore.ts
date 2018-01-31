import { value, task, delay } from "src";

export default class TestStore {
  @value name = "test";
  @value cnt = 0;

  @task.async
  async addAsync(num: number) {
    await delay(100);
    this.cnt += num;
  }
}
