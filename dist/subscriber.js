"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const events_1 = require("./events");
let Subscriber = class Subscriber {
    beforeInsert(event) {
        events_1.encrypt(event.entity);
    }
    afterInsert(event) {
        events_1.decrypt(event.entity);
    }
    beforeUpdate(event) {
        const updatedColumns = event.updatedColumns.map(({ propertyName }) => propertyName);
        events_1.encrypt(event.entity, updatedColumns);
    }
    afterUpdate(event) {
        const updatedColumns = event.updatedColumns.map(({ propertyName }) => propertyName);
        events_1.decrypt(event.entity, updatedColumns);
    }
    afterLoad(entity) {
        events_1.decrypt(entity);
    }
};
Subscriber = __decorate([
    typeorm_1.EventSubscriber()
], Subscriber);
exports.Subscriber = Subscriber;
//# sourceMappingURL=subscriber.js.map