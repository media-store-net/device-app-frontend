import { shallowMount } from "@vue/test-utils";
import DeviceList from "@/components/Devices/DeviceList";

describe("DeviceList.test.js", () => {
    let cmp;

    beforeEach(() => {
        cmp = shallowMount(DeviceList, {
            // Create a shallow instance of the component
            data: () => ({
                icons: {},
                selectedDevice: '',
            })
        });
    });

    // it('equals icons to object', () => {
    //     console.log(cmp)
    //     // Within cmp.vm, we can access all Vue instance methods
    //     expect(cmp.vm.icons).toBeInstanceOf(Object);
    // });

    // it('equals selectedDevice to string', () => {
    //     // Within cmp.vm, we can access all Vue instance methods
    //     expect(cmp.vm.icons).toBeInstanceOf(String);
    // });

    it("has the expected html structure", () => {
        expect(cmp.element).toMatchSnapshot();
    });
});
