import API from '../../src/api/index.js';
import api from '../../src/api/api';

jest.mock('../../src/api/index.js');

it('Should fetch Companies from API', () => {
    const companies = [{ name: 'Firma1' }, { name: 'Firma2' }];
    const response = { data: companies };
    API.get.mockResolvedValue(response);

    return api.getCompanies().then(res => expect(res.data).toEqual(companies));
})

it('Should fetch Devices from API', () => {
    const devices = [{ name: 'Device1' }, { name: 'Device2' }];
    const response = { data: devices };
    API.get.mockResolvedValue(response);

    return api.getCompanies().then(res => expect(res.data).toEqual(devices));
})

it('Should fetch Doctypes from API', () => {
    const doctypes = [{ name: 'Type1' }, { name: 'Type2' }];
    const response = { data: doctypes };
    API.get.mockResolvedValue(response);

    return api.getCompanies().then(res => expect(res.data).toEqual(doctypes));
})
