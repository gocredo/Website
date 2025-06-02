import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter} from "../../ui/drawer";
import { Button } from "../../ui/button";
import { Label } from "@radix-ui/react-label";
interface Details {
  type: "WEBSITE" | "AUDIT" | "EMAIL";
  data: any;
  tenants: { id: string; name: string }[];
}

interface DetailsDrawerProps {
  details: Details | null;
  setDetails: (value: Details | null) => void;
  tenants: { id: string; name: string }[];
}

export function DetailsDrawer({ details, setDetails }: DetailsDrawerProps) {
  if (!details) return null;

  const renderDetails = () => {
    switch (details.type) {
      case "WEBSITE":
        return (
          <>
            <div><Label>Tenant</Label><p>{details.tenants.find((t) => t.id === details.data.tenantId)?.name}</p></div>
            <div><Label>URL</Label><p>{details.data.url}</p></div>
            <div><Label>Media Count</Label><p>{details.data.mediaCount}</p></div>
            <div><Label>Blog Count</Label><p>{details.data.blogCount}</p></div>
            <div><Label>Status</Label><p>{details.data.status}</p></div>
          </>
        );
      case "AUDIT":
        return (
          <>
            <div><Label>Tenant</Label><p>{details.tenants.find((t) => t.id === details.data.tenantId)?.name}</p></div>
            <div><Label>Action</Label><p>{details.data.action}</p></div>
            <div><Label>User</Label><p>{details.data.userId}</p></div>
            <div><Label>Timestamp</Label><p>{new Date(details.data.timestamp).toLocaleString()}</p></div>
            <div><Label>Metadata</Label><pre>{JSON.stringify(details.data.metadata, null, 2)}</pre></div>
          </>
        );
      case "EMAIL":
        return (
          <>
            <div><Label>Tenant</Label><p>{details.tenants.find((t) => t.id === details.data.tenantId)?.name}</p></div>
            <div><Label>Subject</Label><p>{details.data.subject}</p></div>
            <div><Label>Recipients</Label><p>{details.data.recipientEmails.join(", ")}</p></div>
            <div><Label>Content</Label><p>{details.data.content}</p></div>
            <div><Label>Status</Label><p>{details.data.status}</p></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer open={!!details} onOpenChange={() => setDetails(null)}>
      <DrawerContent className="bg-gray-900 border-gray-800 text-white">
        <DrawerHeader>
          <DrawerTitle>{details.type} Details</DrawerTitle>
          <DrawerDescription>View detailed information</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">{renderDetails()}</div>
        <DrawerFooter>
          <Button
            variant="outline"
            className="border-gray-700 bg-gray-900 text-white"
            onClick={() => setDetails(null)}
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}