package org.vaadin.example.MainView;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.compress.utils.IOUtils;
import org.apache.commons.io.FileUtils;
import org.vaadin.example.network.Data;
import org.vaadin.example.network.Edge;
import org.vaadin.example.network.Network;
import org.vaadin.example.network.Node;
import org.vaadin.example.network.options.Option;

import com.google.gson.Gson;
import com.vaadin.flow.component.ClientCallable;
import com.vaadin.flow.component.Html;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.contextmenu.MenuItem;
import com.vaadin.flow.component.contextmenu.SubMenu;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.html.Footer;
import com.vaadin.flow.component.html.Hr;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.menubar.MenuBar;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.dom.Element;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.templatemodel.TemplateModel;

@Tag("vis-connector")
@JsModule("./src/visjs/visjs.js")
@Route("")
public class VisConnector extends PolymerTemplate<TemplateModel> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	List<Node> nodes = new ArrayList<Node>();
	List<Edge> edges = new ArrayList<Edge>();

	MenuBar menuBar = new MenuBar();

	MenuItem toolsMenuItem = menuBar.addItem("Tools", null);

	SubMenu toolsSubMenu = toolsMenuItem.getSubMenu();

	MenuItem newNodeMenuItem = toolsSubMenu.addItem("new Node", null);

	MenuItem changeShapeMenuItem = toolsSubMenu.addItem("change shape", null);

	SubMenu newNodeSubMenu = newNodeMenuItem.getSubMenu();

	SubMenu updateShapeSubMenu = changeShapeMenuItem.getSubMenu();

	private final MemoryBuffer buffer = new MemoryBuffer();

	private final Upload upload = new Upload(buffer);
	private String imagePath;

	String encodedString = "";

	Html header;
	Footer footer;

	Gson gson = new Gson();

	private int selectedNodeId = -1;
	private int draggedNodeId = -1;
	private int nodeLabelId = -1;
	private int nodePositionX = 100;
	private int nodePositionY = 100;
	
	private String newLabel = "";

	public VisConnector() {

		header = getNav();
		footer = getFooter();

		// Create elements for the header and footer slots
		Element headerElement = new Element("div");
		headerElement.setAttribute("slot", "header");
		headerElement.appendChild(header.getElement());

		Element footerElement = new Element("div");
		footerElement.setAttribute("slot", "footer");
		footerElement.appendChild(footer.getElement());

		// Add the elements to your component
		getElement().appendChild(headerElement, footerElement);

		menuBar.getElement().setAttribute("slot", "menu");
		getElement().appendChild(menuBar.getElement());

		newNodeSubMenu.addItem("Add Rectangle", e -> addNode("box"));
		newNodeSubMenu.addItem("Add Triangle", e -> addNode("triangle"));
		newNodeSubMenu.addItem("Add Ellipse", e -> addNode("ellipse"));

		newNodeSubMenu.addItem("Add Image", e -> {

			String imageUrl = uploadImage();

			if (imageUrl != null) {
				addImageNode("image", imageUrl);
				System.out.println(imageUrl);
			}

		});

		toolsSubMenu.addItem("Remove Node", e -> {

			deleteNode(selectedNodeId);
			System.out.println("Node ID from Listener: " + selectedNodeId);
		});

		updateShapeSubMenu.addItem("Rectangle", e -> {

			changeShape(selectedNodeId, "box");

		});

		updateShapeSubMenu.addItem("Ellipse", e -> {
			changeShape(selectedNodeId, "ellipse");

		});

		updateShapeSubMenu.addItem("Triangle", e -> {
			changeShape(selectedNodeId, "triangle");

		});

		updateShapeSubMenu.addItem("Image", e -> {

			String imageUrl = uploadImage();

			if (imageUrl != null) {
				changeShapeToImage(selectedNodeId, "image", imageUrl);
				System.out.println(imageUrl);
			}
		});
		
		toolsSubMenu.addItem("Change Node Label ", e -> {

			changeNodeLabel(nodeLabelId, newLabel);
			

		});



		upload.getElement().setAttribute("slot", "add");
		getElement().appendChild(upload.getElement());

		bindDataToPolymerComponent();

	}

	public Data getData() {

		Data data = new Data(nodes, edges);

		return data;
	}

	public Option getOption() {

		Option option = new Option();

		return option;

	}

	public void bindNodesToPolymerComponent(Data data) {

		String nodesJson = gson.toJson(data.getNodes());
		getElement().setProperty("nodes", nodesJson);
	

	}

	public void bindEdgesToPolymerComponent(Data data) {

		String edgesJson = gson.toJson(data.getEdges());
		getElement().setProperty("edges", edgesJson);

	}

	public void bindOptionToPolymerComponent(Option option) {

		String optionsJson = gson.toJson(option);
		getElement().setProperty("options", optionsJson);

	}

	public void bindDataToPolymerComponent() {
		Data data = getData(); // Retrieve data from Java classes
		Option option = getOption();

		bindNodesToPolymerComponent(data);
		bindEdgesToPolymerComponent(data);
		bindOptionToPolymerComponent(option);

		String imageUrl = uploadImage();
		String jsonImage = gson.toJson(imageUrl);
		getElement().setAttribute("imagee", jsonImage);

		String container = "network";
		String jsonContainer = gson.toJson(container);
		getElement().setProperty("container", jsonContainer);
		Network network = new Network(container, data, option);
		String networkJson = gson.toJson(network);
		getElement().setProperty("Network", networkJson);

	}

	public void addNode(String shape) {

		

		Node node = new Node("node", shape, 100, 100);
		nodes.add(node);
		// Convert the new node to JSON

		bindDataToPolymerComponent();
		
		
		getElement().callJsFunction("drawGraph");

	}

	public void addImageNode(String shape, String base64Image) {

		

		Node node = new Node("node", shape, base64Image, 100, 100);
		nodes.add(node);

		String imageJson = gson.toJson(base64Image);
		getElement().setProperty("imagePath", imageJson);
		bindDataToPolymerComponent();

	
		getElement().callJsFunction("drawGraph");

	}

	public String uploadImage() {
		upload.addSucceededListener(event -> {
			InputStream inputStream = buffer.getInputStream();
			byte[] bytes;
			try {
				bytes = IOUtils.toByteArray(inputStream);

				// save the image file
				String fileName = event.getFileName();
				String directory = "C://Users/USER/Desktop/vaadinImages"; // change this to your directory
				File outputFile = new File(directory, fileName);
				FileUtils.writeByteArrayToFile(outputFile, bytes);

				// read the saved image file and convert to base64 string
				byte[] fileContent = Files.readAllBytes(Paths.get(outputFile.getAbsolutePath()));
				String encodedString = Base64.getEncoder().encodeToString(fileContent);

				imagePath = "data:image/png;base64," + encodedString; // change "image/png" to the actual image format
																		// if not png

			} catch (IOException e) {
				e.printStackTrace();
			}
		});
		upload.addFailedListener(e -> {
			imagePath = null;

		});

		return imagePath;
	}

	@ClientCallable
	public void getNodeIdFromClient(int nodeId) {

		System.out.println("Received ID: " + nodeId);
		selectedNodeId = nodeId;

	}

	@ClientCallable
	public void getPositions(int id, int x, int y) {
		System.out.println("Dragged node ID: " + id);
		System.out.println("Received X: " + x);
		System.out.println("Received Y: " + y);
		draggedNodeId = id;
		nodePositionX = x;
		nodePositionY = y;
		
		Iterator<Node> iterator = nodes.iterator();
		System.out.println("From Iterator");
		
		Data data = new Data(nodes, edges);
		
		while (iterator.hasNext()) {
			Node node = iterator.next();

			if (node.getId() == id) {
				node.setX(x);
				node.setY(y);
				
				
			}
			
			bindNodesToPolymerComponent(data);
			getElement().callJsFunction("drawGraph");
			System.out.println("Node Id: " + node);
		}

	}

	public void deleteNode(int id) {
		Iterator<Node> iterator = nodes.iterator();

		while (iterator.hasNext()) {
			Node node = iterator.next();

			if (node.getId() == id) {
				iterator.remove(); // Safely remove the element

				getElement().callJsFunction("deleteNode");
				System.out.println("Node ID: " + node.getId());
			}
		}

		bindDataToPolymerComponent();

	}

	public void changeShape(int id, String Shape) {

		Iterator<Node> iterator = nodes.iterator();

		while (iterator.hasNext()) {
			Node node = iterator.next();

			if (node.getId() == id) {
				node.setShape(Shape);

				getElement().callJsFunction("setShape");
				System.out.println("Node ID: " + node.getId());
			}
		}

		bindDataToPolymerComponent();

	}

	public void changeShapeToImage(int id, String Shape, String base64Image) {

		Iterator<Node> iterator = nodes.iterator();

		while (iterator.hasNext()) {
			Node node = iterator.next();

			if (node.getId() == id) {
				node.setShape(Shape);
				node.setImageUrl(base64Image);

				getElement().callJsFunction("setShape");
				System.out.println("Node ID: " + node.getId());
			}
		}

		bindDataToPolymerComponent();

	}
	
	public void changeNodeLabel(int id, String label) {
		Iterator<Node> iterator = nodes.iterator();

		while (iterator.hasNext()) {
			Node node = iterator.next();

			if (node.getId() == id) {
				node.setLabel(label);

				getElement().callJsFunction("setLabel");
				
				
				System.out.println("Node : " + node);
			}
		}

		bindDataToPolymerComponent();
		
	}
	
	@ClientCallable
	public void getNewLabelFromClient(int id, String Label) {
		
		System.out.println("Received a new Label from Client :" + Label);
		System.out.println("Received the Id for the Label from Client :" + id);
		newLabel = Label;
		nodeLabelId = id;
	}



	public static Html getNav() {
		Html ul = new Html(
				"<ul style='margin: 0; padding: 8px 15px; list-style: none; display: flex; box-shadow: 0 1px 8px rgba(0,0,0,0.3); width: 100%; height: 50px; '>"
						+ "<a href=''  > <li style='background: #0B84ED; color: #fff; width: 400px;height: 40px;display: flex;justify-content: center;align-items: center;font-size: 2rem;margin: 10px 20px 10px 0; '> Welcome to Our Site </li></a>"

						+ "</li>" + "<li style=' padding: 3px; margin: 10px 20px 10px 0;'>"
						+ "<a href='contact-us' style='display: inline-block; text-decoration: none;  height: 40px;\r\n"
						+ "                width: var(--btn-width-100);\r\n" + "                font-size: 1.5rem;\r\n"
						+ "                display: flex;\r\n" + "                justify-content: center;\r\n"
						+ "                align-items: center;\r\n" + "                color: rgb(158, 158, 158);\r\n"
						+ "                transition: .5s;'>Contact Us</a>" + "</li>"
						+ "<li style='  padding: 3px;margin: 10px 20px 10px 0;'>"
						+ "<a href='login' style='display: inline-block; text-decoration: none;   height: 40px;\r\n"
						+ "                width: var(--btn-width-100);\r\n" + "                font-size: 1.5rem;\r\n"
						+ "                display: flex;\r\n" + "                justify-content: center;\r\n"
						+ "                align-items: center;\r\n" + "                color: rgb(158, 158, 158);\r\n"
						+ "                transition: .5s;'>Login</a>" + "</li>"

						+ "</ul>");
		return ul;

	}

	public static Footer getFooter() {

		Footer footer = new Footer();

		// Create a horizontal layout to organize footer content
		HorizontalLayout footerContent = new HorizontalLayout();

		// Add components to the footer content
		Span copyrightSpan = new Span("© 2023 Your Company");
		Span separatorSpan = new Span("|");
		Span privacySpan = new Span("Privacy Policy");
		Span termsSpan = new Span("Terms of Service");

		footerContent.add(copyrightSpan, separatorSpan, privacySpan, separatorSpan, termsSpan);

		// Add the footer content to the footer element
		footer.add(footerContent);

		// Style the footer
		footer.getStyle().set("background-color", "#333").set("color", "#fff").set("padding", "10px 0");
		footerContent.setSpacing(true);
		footerContent.setWidth("20000px");
		separatorSpan.getStyle().set("margin", "0 10px");

		// Create a horizontal line as a separator
		Hr separator = new Hr();
		separator.getStyle().set("border-color", "#555");

		// Add the separator and footer to the main content

		return footer;

	}

}
