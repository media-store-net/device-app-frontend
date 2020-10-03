import { state, getters, mutations, actions } from '../../src/store/index';

describe('getters and mutations', () => {
    // destructure getters
    const { authKey, companies, devices, doctypes, parts, currentDevice } = getters;
    // destructure mutations
    const { setAuthKey, setCompanies, setCurrentDevice, setDevices, setParts, setDoctypes } = mutations;
    // testArray for all tests
    const testArray = [1, 2, 3];
    const testObject = { name: 'test' };

    // setAuthKey
    it('setAuthKey', () => {

        setAuthKey(state, 12345);

        expect(state.authKey).toEqual(12345);
        expect(authKey(state)).toEqual(state.authKey)
        return;
    });
    // setCompanies
    it('setCompanies', () => {
        setCompanies(state, testArray)

        expect(state.companies).toEqual(testArray);
        expect(companies(state)).toEqual(state.companies)
        return;
    })
    // setDevices
    it('setDevices', () => {
        setDevices(state, testArray)

        expect(state.devices).toEqual(testArray);
        expect(devices(state)).toEqual(state.devices);
        return;
    })
    // setDoctypes
    it('setDoctypes', () => {
        setDoctypes(state, testArray)

        expect(state.doctypes).toEqual(testArray);
        expect(doctypes(state)).toEqual(state.doctypes);
        return;
    })
    // setParts
    it('setParts', () => {
        setParts(state, testArray)

        expect(state.parts).toEqual(testArray);
        expect(parts(state)).toEqual(state.parts);
        return;
    })
    // setCurrentDevice
    it('setCurrentDevice', () => {
        setCurrentDevice(state, testObject)

        expect(state.currentDevice).toEqual(testObject);
        expect(currentDevice(state)).toEqual(state.currentDevice);
    })
})
