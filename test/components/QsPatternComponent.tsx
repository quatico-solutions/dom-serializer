/* eslint-disable @typescript-eslint/no-empty-function */
import { Stack, Layout, Button } from "@webbloqs/react";

export const QsPatternComponent = () => {
    return (
        <Stack>
            <Layout>
                <p>Foo Bar</p>
            </Layout>
            <Layout md="1|1">
                <p>Zip</p>
                <p>Zap</p>
            </Layout>
            <Layout md="1|1">
                <p>Zap</p>
                <p>Zup</p>
            </Layout>
            <Layout md="1|1">
                <Button kind="default" onClick={() => {}}>
                    Previous
                </Button>
                <Button kind="default" onClick={() => {}}>
                    Next
                </Button>
            </Layout>
        </Stack>
    );
};
