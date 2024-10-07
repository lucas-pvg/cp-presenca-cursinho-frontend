import { get, post, patch, destroy } from "../axios"
import { recurrencyMapper, recurrentDatetimeRequestMapper } from "../../data/mapper";
import { LessonRecurrencyResponse } from "../../data/models/recurrency.model";
import { LessonRecurrentDatetime } from "../../data/models/recurrency.model";

const RecurrencyService = {
  async listRecurrency(params?: unknown) {
    const response = await get('lesson_recurrency/', { params });
    const recurrencyMapped = response.map((recurrency: LessonRecurrencyResponse) => 
      recurrencyMapper(recurrency)
    );

    return recurrencyMapped;
  },

  async listRecurrencyFromParams(subject: number, studentClass: number) {
    const response = await get(`lesson_recurrency/${subject}/${studentClass}/`)
    const recurrencyMapped = recurrencyMapper(response)

    return recurrencyMapped
  },

  async createRecurrentDatetime(datetime: LessonRecurrentDatetime) {
    return await post(`lesson_recurrent_datetime/`, recurrentDatetimeRequestMapper(datetime));
  },

  async updateRecurrentDatetime(datetime: LessonRecurrentDatetime) {
    return await patch(`lesson_recurrent_datetime/${datetime.id}/`, recurrentDatetimeRequestMapper(datetime))
  },

  async deleteRecurrentDatetime(datetimeId: number) {
    return await destroy(`lesson_recurrent_datetime/${datetimeId}/`)
  }
}

export default RecurrencyService
