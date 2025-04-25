const { where } = require("sequelize");
const { Logger } = require("../config");
const {StatusCodes} = require("http-status-codes");
const AppError = require("../utils/errors/app-errors");

class crudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error("something went wrong");
      throw error;
    }
  }
  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      });
      if(!response){
        throw new AppError("data not found", StatusCodes.NOT_FOUND);
      }
      return response;
    } catch (error) {
      Logger.error("something went wrong");
      throw error;
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      if(!response){
        throw new AppError("data not found", StatusCodes.NOT_FOUND);
      }
      return response;
    } catch (error) {
      Logger.error("something went wrong");
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("something went wrong");
      throw error;
    }
  }





  
  async update(id, data) {
    try {
      const [updatedCount] = await this.model.update(data, {
        where: { id },
      });
      if (updatedCount === 0) {
        throw new AppError("data not found", StatusCodes.NOT_FOUND);
      }
      return await this.get(id); // fetch updated airplane
    } catch (error) {
      Logger.error("something went wrong");
      throw error;
    }
  }
}



module.exports = crudRepository;
