import { getMyProperty } from "@/lib/actions/api/property";
import {
  Table,
  Chip,
  Button,
} from "@heroui/react";

import {
  Pencil,
  TrashBin,
} from "@gravity-ui/icons";

const MyPropertyPage = async () => {
  const myPropertyId = "property_123";

  const properties = await getMyProperty(myPropertyId);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          My Properties
        </h1>

        <p className="text-slate-400">
          Manage all your property listings
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <Table>
          <Table.ResizableContainer>
            <Table.Content
              aria-label="My Properties Table"
              className="min-w-[700px]"
            >
              <Table.Header>
                <Table.Column
                  isRowHeader
                  defaultWidth="2fr"
                  minWidth={220}
                >
                  Property
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="1fr"
                  minWidth={150}
                >
                  Type
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="1fr"
                  minWidth={140}
                >
                  Rent
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="1fr"
                  minWidth={150}
                >
                  Status
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="1fr"
                  minWidth={150}
                >
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {properties?.map((property) => (
                  <Table.Row key={property._id}>
                    <Table.Cell>
                      <div>
                        <h3 className="font-semibold text-white">
                          {property.title}
                        </h3>

                        <p className="text-xs text-slate-400">
                          {property.location}
                        </p>
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      {property.propertyType}
                    </Table.Cell>

                    <Table.Cell>
                      ৳ {property.rent}
                      <span className="ml-1 text-xs text-slate-400">
                        / {property.rentType}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <Chip
                        size="sm"
                        variant="soft"
                        color={
                          property.status === "approved"
                            ? "success"
                            : property.status === "rejected"
                            ? "danger"
                            : "warning"
                        }
                      >
                        {property.status}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex items-center gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          color="primary"
                        >
                          <Pencil />
                        </Button>

                        <Button
                          isIconOnly
                          size="sm"
                          variant="flat"
                          color="danger"
                        >
                          <TrashBin />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>
    </section>
  );
};

export default MyPropertyPage;